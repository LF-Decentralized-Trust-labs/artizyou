import EXIF from 'exif-js';

export const getOrientation = (preview) => (
  new Promise((resolve) => {
    const image = new Image();

    image.onload = () => {
      EXIF.getData(image, function () {
        const srcOrientation = EXIF.getTag(this, 'Orientation');
        let result = '0deg';

        switch(srcOrientation) {
          case 3:
          case 4:
            result = '180deg';
            break;
          case 5:
          case 6:
            result = '90deg';
            break;
          case 8:
          case 7:
            result = '270deg';
            break;
          default:
            result = '0deg';
            break;
        }

        resolve(result);
      });
    };

    image.src = preview;
    image.crossOrigin = 'Anonymous';
  })
);

export const setOrientation = async function(preview) {
  const orientation = await getOrientation(preview);

  if (orientation !== '') {
    this.setState({
      orientation: orientation
    });
  }
};