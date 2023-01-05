import anime, { AnimeCallBack } from 'animejs';

const marginTop = (
  targets: string,
  value: string,
  onComplete?: AnimeCallBack['complete']
) =>
  anime({
    targets,
    marginTop: value,
    easing: 'easeInOutSine',
    duration: 350,
    complete: onComplete
  });

export default marginTop;
