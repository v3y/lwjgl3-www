import { useMemo, useRef } from 'react';
import { useMemoSlice } from './Store';
import { BuildToolbar } from './BuildToolbar';
import { useRecoilValue } from 'recoil';
import { breakpoint, Breakpoint } from '~/theme/breakpoints';
import { copyToClipboard, generateScript, getSelectedPlatforms, mime } from './lib/script';
import { BuildType } from './types';
import { Button } from '~/components/forms/Button';
import { AnchorButton } from '~/components/ui/LinkButton';
import { Text } from '~/components/ui/Text';
import { Icon } from '~/components/ui/Icon';
import '~/theme/icons/fa/duotone/cloud-download';
import '~/theme/icons/fa/duotone/copy';
import { styled } from '~/theme/stitches.config';

import type {
  Addon,
  AddonMap,
  Binding,
  BindingMapUnsafe,
  BuildStoreSnapshot,
  Language,
  ModeDefinition,
  Native,
  PlatformSelection,
  Version,
} from './types';

const ALLOW_DOWNLOAD = window.btoa !== undefined;

export interface State {
  build: BuildType;
  mode: ModeDefinition;
  version: Version;
  hardcoded: boolean;
  compact: boolean;
  osgi: boolean;
  language: Language;
  platform: PlatformSelection;
  platformSingle: Native | null;
  artifacts: BindingMapUnsafe;
  selected: Array<Binding>;
  addons: AddonMap;
  selectedAddons: Array<Addon>;
}

interface Props {
  configDownload: (event: React.MouseEvent<HTMLButtonElement>) => void;
  configLoad: (payload: BuildStoreSnapshot) => void;
}

export function BuildScript({ configDownload, configLoad }: Props) {
  const preRef = useRef<HTMLPreElement>(null);
  const currentBreakpoint = useRecoilValue(breakpoint);

  // Slice
  const [slice] = useMemoSlice(
    (state): State => {
      // Artifacts
      const selected: Array<Binding> = [];

      state.artifacts.allIds.forEach((artifact) => {
        if (state.contents[artifact] === true && state.availability[artifact] === true) {
          selected.push(artifact);
        }
      });

      // Addons
      const selectedAddons: Array<Addon> = [];
      state.selectedAddons.forEach((id) => {
        const addon = state.addons.byId[id];
        if (addon.modes === undefined || addon.modes.indexOf(state.mode) > -1) {
          selectedAddons.push(id);
        }
      });

      return {
        build: state.build as BuildType,
        mode: state.modes.byId[state.mode],
        version: state.artifacts.version,
        hardcoded: state.hardcoded,
        compact: state.compact,
        osgi: state.osgi && state.build === BuildType.Release && parseInt(state.version.replace(/\./g, ''), 10) >= 312,
        language: state.language,
        platform: state.platform,
        platformSingle: getSelectedPlatforms(state.natives.allIds, state.platform),
        artifacts: state.artifacts.byId as BindingMapUnsafe,
        selected,
        addons: state.addons.byId,
        selectedAddons,
      };
    },
    ({ build, mode, version, hardcoded, compact, osgi, language, platform, selectedAddons, contents }) => [
      build,
      mode,
      version,
      hardcoded,
      compact,
      osgi,
      language,
      platform,
      selectedAddons,
      contents,
    ]
  );

  const { mode } = slice;

  return useMemo(() => {
    const labels = {
      download: `DOWNLOAD ${typeof mode.file === 'string' ? mode.file.toUpperCase() : 'FILE'}`,
      copy: ' COPY TO CLIPBOARD',
    };

    if (currentBreakpoint < Breakpoint.sm) {
      labels.download = 'DOWNLOAD';
      labels.copy = '';
    } else if (currentBreakpoint < Breakpoint.md) {
      labels.copy = ' COPY';
    }

    const script = generateScript(mode.id, slice);

    return (
      <>
        <Text as="h2" css={{ mt: '$gutter', sm: { mt: '1rem' } }}>
          <ScriptLogo flipOnDark={mode.id === 'maven'} src={mode.logo} alt={mode.title} />
        </Text>
        <Pre ref={preRef}>
          <code>{script}</code>
        </Pre>
        <BuildToolbar configDownload={configDownload} configLoad={configLoad}>
          {ALLOW_DOWNLOAD && (
            <AnchorButton
              download={mode.file}
              href={`data:${mime(mode)};base64,${btoa(script)}`}
              title={`Download ${mode.id} code snippet`}
            >
              <Icon name="fa/duotone/cloud-download" /> {labels.download}
            </AnchorButton>
          )}
          <Button onClick={() => copyToClipboard(preRef)} disabled={!document.execCommand} title="Copy to clipboard">
            <Icon name="fa/duotone/copy" />
            {labels.copy}
          </Button>
        </BuildToolbar>
      </>
    );
  }, [slice, currentBreakpoint, mode, configDownload, configLoad]);
}

const ScriptLogo = styled('img', {
  height: 60,
  variants: {
    flipOnDark: {
      true: {
        dark: {
          filter: 'invert(90%)',
        },
      },
    },
  },
});

const Pre = styled('pre', {
  maxWidth: 'calc(100vw - 3.6rem)',
  overflow: 'auto',
  padding: '$gutter',
  backgroundColor: '$caution50',
  border: '1px solid $gray700',
  fontSize: '$sm',
});
