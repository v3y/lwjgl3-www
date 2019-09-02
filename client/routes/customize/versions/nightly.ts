import { Binding, BuildBindings, NATIVE_ALL, Version } from '../types';

export default (prev: BuildBindings): BuildBindings => ({
  ...prev,
  version: Version.LWJGL324,
  alias: Version.Nightly,
  byId: {
    ...prev.byId,
    [Binding.BULLET]: {
      id: Binding.BULLET,
      title: 'Bullet Physics',
      description:
        'Real-time collision detection and multi-physics simulation for VR, games, visual effects, robotics, machine learning etc.',
      natives: NATIVE_ALL,
      website: 'http://bulletphysics.org/',
    },
  },
});
