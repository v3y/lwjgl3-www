import { createStyled } from '@stitches/react';
// import { rangei } from '../services/range';
import { setLightness } from './color';
import * as light from './palettes/default-light';
import * as dark from './palettes/default-dark';

import type { TConfig } from '@stitches/core';
import type { Hsl } from './color';

type LiteralUnion<T extends U, U> = T | (U & {});
type Spacing = '$xxsm' | '$xsm' | '$sm' | '$md' | '$safe' | '$gap' | '$paragraph' | '$gutter' | '$lg' | '$xl' | '$xxl';
type SpaceValue = LiteralUnion<Spacing, string> | number;

function getSpace(value: SpaceValue, config: TConfig): string | number {
  return config.tokens!.space![value] ?? value;
}

function outlineColor(color: Hsl, opacity = 0.45) {
  return `hsla(${color.hue},${color.saturation}%,${color.lightness}%,${opacity})`;
}

// Spec:
// https://system-ui.com/theme/
// Tokens from:
// https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/defaultConfig.stub.js

export const { styled, css } = createStyled({
  // prefix: '',
  tokens: {
    colors: {
      // Basic
      $black: '#000',
      $white: '#fff',
      // $link: 'hsl(200, 98%, 39%)',
      // $link: '#197ab4',
      $link: '#0e7490',
      $body: light.BG.css(),
      $text: light.TEXT.css(),

      // LWJGL
      $dark: dark.BG.css(),
      $darker: setLightness(dark.BG, 4).css(),

      // Palette
      $primary50: light.PRIMARY[0].css(),
      $primary100: light.PRIMARY[1].css(),
      $primary200: light.PRIMARY[2].css(),
      $primary300: light.PRIMARY[3].css(),
      $primary400: light.PRIMARY[4].css(),
      $primary500: light.PRIMARY[5].css(),
      $primary600: light.PRIMARY[6].css(),
      $primary700: light.PRIMARY[7].css(),
      $primary800: light.PRIMARY[8].css(),
      $primary900: light.PRIMARY[9].css(),

      // $accent50: light.ACCENT[0].css(),
      // $accent100: light.ACCENT[1].css(),
      // $accent200: light.ACCENT[2].css(),
      // $accent300: light.ACCENT[3].css(),
      // $accent400: light.ACCENT[4].css(),
      // $accent500: light.ACCENT[5].css(),
      // $accent600: light.ACCENT[6].css(),
      // $accent700: light.ACCENT[7].css(),
      // $accent800: light.ACCENT[8].css(),
      // $accent900: light.ACCENT[9].css(),

      $neutral50: light.NEUTRAL[0].css(),
      $neutral100: light.NEUTRAL[1].css(),
      $neutral200: light.NEUTRAL[2].css(),
      $neutral300: light.NEUTRAL[3].css(),
      $neutral400: light.NEUTRAL[4].css(),
      $neutral500: light.NEUTRAL[5].css(),
      $neutral600: light.NEUTRAL[6].css(),
      $neutral700: light.NEUTRAL[7].css(),
      $neutral800: light.NEUTRAL[8].css(),
      $neutral900: light.NEUTRAL[9].css(),

      $critical50: light.CRITICAL[0].css(),
      $critical100: light.CRITICAL[1].css(),
      $critical200: light.CRITICAL[2].css(),
      $critical300: light.CRITICAL[3].css(),
      $critical400: light.CRITICAL[4].css(),
      $critical500: light.CRITICAL[5].css(),
      $critical600: light.CRITICAL[6].css(),
      $critical700: light.CRITICAL[7].css(),
      $critical800: light.CRITICAL[8].css(),
      $critical900: light.CRITICAL[9].css(),

      $caution50: light.CAUTION[0].css(),
      $caution100: light.CAUTION[1].css(),
      $caution200: light.CAUTION[2].css(),
      $caution300: light.CAUTION[3].css(),
      $caution400: light.CAUTION[4].css(),
      $caution500: light.CAUTION[5].css(),
      $caution600: light.CAUTION[6].css(),
      $caution700: light.CAUTION[7].css(),
      $caution800: light.CAUTION[8].css(),
      $caution900: light.CAUTION[9].css(),

      $positive50: light.POSITIVE[0].css(),
      $positive100: light.POSITIVE[1].css(),
      $positive200: light.POSITIVE[2].css(),
      $positive300: light.POSITIVE[3].css(),
      $positive400: light.POSITIVE[4].css(),
      $positive500: light.POSITIVE[5].css(),
      $positive600: light.POSITIVE[6].css(),
      $positive700: light.POSITIVE[7].css(),
      $positive800: light.POSITIVE[8].css(),
      $positive900: light.POSITIVE[9].css(),

      $info50: light.INFO[0].css(),
      $info100: light.INFO[1].css(),
      $info200: light.INFO[2].css(),
      $info300: light.INFO[3].css(),
      $info400: light.INFO[4].css(),
      $info500: light.INFO[5].css(),
      $info600: light.INFO[6].css(),
      $info700: light.INFO[7].css(),
      $info800: light.INFO[8].css(),
      $info900: light.INFO[9].css(),

      $outline_primary: outlineColor(light.PRIMARY[5]),
      $outline_neutral: outlineColor(light.NEUTRAL[5]),
      $outline_critical: outlineColor(light.CRITICAL[5]),
      $outline_caution: outlineColor(light.CAUTION[5]),
      $outline_positive: outlineColor(light.POSITIVE[5]),
      $outline_info: outlineColor(light.INFO[5]),
    },
    space: {
      // ...spacing(),
      // [pm][tblrxy][:]
      // [pm][tblrxy][:] ['][$]
      $xxsm: '0.25rem', // $1 4px
      $xsm: '0.5rem', // $2 8px
      $sm: '0.75rem', //$3 12px
      $md: '1.25rem', // $5 20px
      $safe: 'calc(var(--scale, 1) * 1.5rem)', // screen-safe, dynamic based on viewport size
      $gap: 'calc(var(--scale, 1) * 1.25rem)', // grid gaps, etc, dynamic based on viewport size
      $paragraph: 'calc(var(--scale-sm, 1) * 0.9rem)', // grid gaps, paragraph spacing, etc, dynamic based on viewport size
      $gutter: '1.5rem', // $6 24px // fixed gutter
      $lg: '2rem', // $8 32px
      $xl: '4rem', // $16 64px
      $xxl: '6rem', // $24 96px
    },
    fontSizes: {
      $xs: '0.75rem',
      $sm: '0.875rem',
      $lg: '1.125rem',
      $xl: '1.25rem',
      $2xl: '1.5rem',
      $3xl: '1.875rem',
      $4xl: '2.25rem',
      $5xl: '3rem',
      // $6xl: '3.75rem',
      // $7xl: '4.5rem',
      // $8xl: '6rem',
      // $9xl: '8rem',
    },
    fonts: {
      $sans:
        'ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
      $serif: 'ui-serif,Georgia,Cambria,"Times New Roman",Times,serif',
      $mono: 'ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace',
    },
    fontWeights: {
      $thin: '100',
      $extralight: '200',
      $light: '300',
      $normal: '400',
      $medium: '500',
      $semibold: '600',
      $bold: '700',
      $extrabold: '800',
      $black: '900',
    },
    lineHeights: {
      $tight: '1.25',
      $snug: '1.375',
      $normal: '1.5',
      $relaxed: '1.625',
      $loose: '2',
    },
    letterSpacings: {
      $tighter: '-0.05em',
      $tight: '-0.025em',
      $normal: '0',
      $wide: '0.025em',
      $wider: '0.05em',
      $widest: '0.1em',
    },
    sizes: {
      // $xs: '20rem',
      // $sm: '24rem',
      // $md: '28rem',
      // $lg: '32rem',
      // $xl: '36rem',
      // $2xl: '42rem',
      // $3xl: '48rem',
      // $4xl: '56rem',
      // $5xl: '64rem',
      // $6xl: '72rem',
      // $7xl: '80rem',
      // '$screen-sm': '640px',
      // '$screen-md': '768px',
      // '$screen-lg': '1024px',
      // '$screen-xl': '1280px',
      // '$screen-2xl': '1536px',
      // $min: 'min-content',
      // $max: 'max-content',
      // $prose: '65ch',
    },
    // borderWidths: {},
    // borderStyles: {},
    radii: {
      // $none: '0',
      $sm: '0.125rem',
      $rounded: '0.25rem',
      $md: '0.375rem',
      $lg: '0.5rem',
      $xl: '0.75rem',
      $2xl: '1rem',
      $3xl: '1.5rem',
      $full: '50%',
    },
    shadows: {
      // '$distant': '0 15px 35px -5px rgba(0,0,0,.25)',
      $xs: '0 0 0 1px rgba(0, 0, 0, 0.05)',
      $sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      $shadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      $md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      $lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      $xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      $2xl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      $inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      $outline: '0 0 0 3px rgba(161, 161, 170, 0.45)',
      // $indigo: '0 0 0 3px rgba(67, 56, 202, 0.45)',
      solid: '0 0 0 2px currentColor',
      // $none: 'none',
    },
    // zIndices: {},
    transitions: {},
  },
  breakpoints: {
    // The maximum value is reduced by 0.02px to work around the limitations of
    // `min-` and `max-` prefixes and viewports with fractional widths.
    // See https://www.w3.org/TR/mediaqueries-4/#mq-min-max
    // Uses 0.02px rather than 0.01px to work around a current rounding bug in Safari.
    // See https://bugs.webkit.org/show_bug.cgi?id=178261
    'sm-down': (rule) => `@media(max-width:${576 - 0.02}px){${rule}}`,
    sm: (rule) => `@media(min-width:576px){${rule}}`,
    'md-down': (rule) => `@media(max-width:${768 - 0.02}px){${rule}}`,
    md: (rule) => `@media(min-width:768px){${rule}}`,
    'lg-down': (rule) => `@media (max-width:${992 - 0.02}px){${rule}}`,
    lg: (rule) => `@media(min-width:992px){${rule}}`,
    'xl-down': (rule) => `@media(max-width:${1200 - 0.02}px){${rule}}`,
    xl: (rule) => `@media(min-width:1200px){${rule}}`,
    'xxl-down': (rule) => `@media(max-width:${1400 - 0.02}px){${rule}}`,
    xxl: (rule) => `@media(min-width:1400px){${rule}}`,
    max: (rule) => `@supports(width:max(1px,2px)){${rule}}`,
    min: (rule) => `@supports(width:min(1px,2px)){${rule}}`,
    clamp: (rule) => `@supports(width:clamp(140px,16vw,220px)){${rule}}`,
    // prefersDark: (rule) => `@media(prefers-color-scheme:dark){${rule}}`,
    // prefersLight: (rule) => `@media(prefers-color-scheme:light){${rule}}`,
  },
  utils: {
    wrap: (value: 'normal' | 'word' | 'all' | 'truncate') => {
      switch (value) {
        case 'normal':
          return {
            overflowWrap: 'normal',
            wordBreak: 'normal',
          };
        case 'word':
          return {
            overflowWrap: 'break-word',
          };
        case 'all':
          return {
            wordBreak: 'break-all',
          };
        case 'truncate':
          return {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          };
        default:
          throw new Error('Unsupported wrap value');
      }
    },
    // // Use tokens.space in flex-basis
    // basis: (value: SpaceValue, config) => ({
    //   flexBasis: getSpace(value, config),
    // }),
    // w: (value: SpaceValue, config) => ({
    //   width: getSpace(value, config),
    // }),
    // h: (value: SpaceValue, config) => ({
    //   height: getSpace(value, config),
    // }),
    // square: (value: SpaceValue, config) => {
    //   const width = getSpace(value, config);
    //   return {
    //     width,
    //     height: width,
    //   };
    // },
    mt: (value: SpaceValue, config) => ({
      marginTop: getSpace(value, config),
    }),
    mr: (value: SpaceValue, config) => ({
      marginRight: getSpace(value, config),
    }),
    mb: (value: SpaceValue, config) => ({
      marginBottom: getSpace(value, config),
    }),
    ml: (value: SpaceValue, config) => ({
      marginLeft: getSpace(value, config),
    }),
    mx: (value: SpaceValue, config) => {
      const marginLeft = getSpace(value, config);
      return {
        marginLeft,
        marginRight: marginLeft,
      };
    },
    my: (value: SpaceValue, config) => {
      const marginTop = getSpace(value, config);
      return {
        marginTop,
        marginBottom: marginTop,
      };
    },
    pt: (value: SpaceValue, config) => ({
      paddingTop: getSpace(value, config),
    }),
    pr: (value: SpaceValue, config) => ({
      paddingRight: getSpace(value, config),
    }),
    pb: (value: SpaceValue, config) => ({
      paddingBottom: getSpace(value, config),
    }),
    pl: (value: SpaceValue, config) => ({
      paddingLeft: getSpace(value, config),
    }),
    px: (value: SpaceValue, config) => {
      const paddingLeft = getSpace(value, config);
      return {
        paddingLeft,
        paddingRight: paddingLeft,
      };
    },
    py: (value: SpaceValue, config) => {
      const paddingTop = getSpace(value, config);
      return {
        paddingTop,
        paddingBottom: paddingTop,
      };
    },
    // // Use this inside another container
    // flexGap: (value, config) => ({
    //   '--gap': value,
    //   margin: 'calc(var(--gap) / -2)',
    //   '& > *': {
    //     margin: 'calc(var(--gap) / 2)',
    //   },
    // }),
    hgap: (value /*, config*/) => ({
      '& > * + *': {
        // marginLeft: getSpace(value, config),
        marginLeft: value,
      },
    }),
    vgap: (value /*, config*/) => ({
      '& > * + *': {
        // marginTop: getSpace(value, config),
        marginTop: value,
      },
    }),
    // vh100: (value: any, config) => {
    //   return {
    //     // height: '100%',
    //     // '@supports (height:100vh)': {
    //     //   height: '100vh',
    //     // },
    //     height: '100vh',
    //     '@supports (height:-moz-available)': {
    //       height: '-moz-available',
    //     },
    //     '@supports (height:-webkit-fill-available)': {
    //       height: '-webkit-fill-available',
    //     },
    //   };
    // },
    dark: (value: any, config) => ({
      '.dark &': value,
    }),
    light: (value: any, config) => ({
      '.light &': value,
    }),
  },
});

export const themes = {
  dark: generateTheme({ palette: dark, outlineStop: 6 }),
};

function generateTheme({
  palette,
  outlineStop = 5,
  darkPalette,
}: {
  palette: any;
  outlineStop?: number;
  darkPalette?: any;
}) {
  return css.theme({
    colors: {
      $body: palette.BG.css(),
      $text: palette.TEXT.css(),
      $dark: darkPalette ? darkPalette.BG.css() : palette.BG.css(),
      $darker: setLightness(darkPalette ? darkPalette.BG : palette.BG, 8).css(),

      // Palette
      $primary50: palette.PRIMARY[0].css(),
      $primary100: palette.PRIMARY[1].css(),
      $primary200: palette.PRIMARY[2].css(),
      $primary300: palette.PRIMARY[3].css(),
      $primary400: palette.PRIMARY[4].css(),
      $primary500: palette.PRIMARY[5].css(),
      $primary600: palette.PRIMARY[6].css(),
      $primary700: palette.PRIMARY[7].css(),
      $primary800: palette.PRIMARY[8].css(),
      $primary900: palette.PRIMARY[9].css(),

      // $accent50: palette.ACCENT[0].css(),
      // $accent100: palette.ACCENT[1].css(),
      // $accent200: palette.ACCENT[2].css(),
      // $accent300: palette.ACCENT[3].css(),
      // $accent400: palette.ACCENT[4].css(),
      // $accent500: palette.ACCENT[5].css(),
      // $accent600: palette.ACCENT[6].css(),
      // $accent700: palette.ACCENT[7].css(),
      // $accent800: palette.ACCENT[8].css(),
      // $accent900: palette.ACCENT[9].css(),

      $neutral50: palette.NEUTRAL[0].css(),
      $neutral100: palette.NEUTRAL[1].css(),
      $neutral200: palette.NEUTRAL[2].css(),
      $neutral300: palette.NEUTRAL[3].css(),
      $neutral400: palette.NEUTRAL[4].css(),
      $neutral500: palette.NEUTRAL[5].css(),
      $neutral600: palette.NEUTRAL[6].css(),
      $neutral700: palette.NEUTRAL[7].css(),
      $neutral800: palette.NEUTRAL[8].css(),
      $neutral900: palette.NEUTRAL[9].css(),

      $critical50: palette.CRITICAL[0].css(),
      $critical100: palette.CRITICAL[1].css(),
      $critical200: palette.CRITICAL[2].css(),
      $critical300: palette.CRITICAL[3].css(),
      $critical400: palette.CRITICAL[4].css(),
      $critical500: palette.CRITICAL[5].css(),
      $critical600: palette.CRITICAL[6].css(),
      $critical700: palette.CRITICAL[7].css(),
      $critical800: palette.CRITICAL[8].css(),
      $critical900: palette.CRITICAL[9].css(),

      $caution50: palette.CAUTION[0].css(),
      $caution100: palette.CAUTION[1].css(),
      $caution200: palette.CAUTION[2].css(),
      $caution300: palette.CAUTION[3].css(),
      $caution400: palette.CAUTION[4].css(),
      $caution500: palette.CAUTION[5].css(),
      $caution600: palette.CAUTION[6].css(),
      $caution700: palette.CAUTION[7].css(),
      $caution800: palette.CAUTION[8].css(),
      $caution900: palette.CAUTION[9].css(),

      $positive50: palette.POSITIVE[0].css(),
      $positive100: palette.POSITIVE[1].css(),
      $positive200: palette.POSITIVE[2].css(),
      $positive300: palette.POSITIVE[3].css(),
      $positive400: palette.POSITIVE[4].css(),
      $positive500: palette.POSITIVE[5].css(),
      $positive600: palette.POSITIVE[6].css(),
      $positive700: palette.POSITIVE[7].css(),
      $positive800: palette.POSITIVE[8].css(),
      $positive900: palette.POSITIVE[9].css(),

      $info50: palette.INFO[0].css(),
      $info100: palette.INFO[1].css(),
      $info200: palette.INFO[2].css(),
      $info300: palette.INFO[3].css(),
      $info400: palette.INFO[4].css(),
      $info500: palette.INFO[5].css(),
      $info600: palette.INFO[6].css(),
      $info700: palette.INFO[7].css(),
      $info800: palette.INFO[8].css(),
      $info900: palette.INFO[9].css(),

      $outline_primary: outlineColor(palette.PRIMARY[outlineStop]),
      $outline_neutral: outlineColor(palette.NEUTRAL[outlineStop]),
      $outline_critical: outlineColor(palette.CRITICAL[outlineStop]),
      $outline_caution: outlineColor(palette.CAUTION[outlineStop]),
      $outline_positive: outlineColor(palette.POSITIVE[outlineStop]),
      $outline_info: outlineColor(palette.INFO[outlineStop]),
    },
  });
}

/*
interface Spacing {
  $0: string;
  $px: string;
  '$-px': string;
  '$0.5': string;
  $1: string; // bootstrap p-1
  '$1.5': string;
  $2: string; // bootstrap p-2
  '$2.5': string;
  $3: string;
  '$3.5': string;
  $4: string; // bootstrap p-3
  $5: string;
  $6: string; // bootstrap p-4
  $7: string;
  $8: string;
  $9: string;
  $10: string;
  $12: string; // bootstrap p-5
  $14: string;
  $16: string;
  $20: string;
  $24: string;
  $28: string;
  $32: string;
  $36: string;
  $40: string;
  $44: string;
  $48: string;
  $52: string;
  $56: string;
  $60: string;
  $64: string;
  $72: string;
  $80: string;
  $96: string;
  '-$0.5': string;
  '$-1': string;
  '$-1.5': string;
  '$-2': string;
  '$-2.5': string;
  '$-3': string;
  '$-3.5': string;
  '$-4': string;
  '$-5': string;
  '$-6': string;
  '$-7': string;
  '$-8': string;
  '$-9': string;
  '$-10': string;
  '$-12': string;
  '$-14': string;
  '$-16': string;
  '$-20': string;
  '$-24': string;
  '$-28': string;
  '$-32': string;
  '$-36': string;
  '$-40': string;
  '$-44': string;
  '$-48': string;
  '$-52': string;
  '$-56': string;
  '$-60': string;
  '$-64': string;
  '$-72': string;
  '$-80': string;
  '$-96': string;
}

function spacing(): Spacing {
  const sizing: { [key: string]: string } = {
    $0: '0',
    $px: '1px',
    '$-px': '-1px',
  };
  const sizes = [...rangei(0.5, 3.5, 0.5), ...rangei(4, 10), 12, 14, 16, ...rangei(20, 64, 4), 72, 80, 96];
  const rems = [...rangei(0.125, 1, 0.125), ...rangei(1.25, 2.5, 0.25), 3, 3.5, ...rangei(4, 16), 18, 20, 24];

  for (let i = 0; i < sizes.length; i += 1) {
    sizing[`$${sizes[i]}`] = `${rems[i]}rem`;
    sizing[`$-${sizes[i]}`] = `-${rems[i]}rem`;
  }

  //@ts-ignore
  return sizing;
}

function getToken(value: string | number, token: keyof typeof config['tokens'], config: TConfig<true>) {
  if (config!.tokens![token]![value] !== undefined) {
    return config!.tokens![token]![value];
  }
  if (config.strict) {
    throw new Error('Arbitrary values not allowed in strict mode');
  }
  return value;
}
*/
