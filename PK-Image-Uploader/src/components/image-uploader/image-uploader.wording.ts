export const imageUploaderWording = {
  boxText: 'Drag and drop an image here, or',
  hint: (minW, minH, maxW, maxH, maxS) => {
    if ((minW == 0 || minH == 0) && (maxW == 0 || maxH == 0)) {
      return `The image must be no larger than ${maxS}MB. Only JPG and PNG files are supported.`;
    } else if (minW == 0 || minH == 0) {
      return `The image resolution must be smaller than ${maxW}x${maxH}px, and the file size no larger than ${maxS}MB. Only JPG and PNG files are supported.`;
    } else if (maxW == 0 || maxH == 0) {
      return `The image resolution must be larger than ${minW}x${minH}px, and the file size no larger than ${maxS}MB. Only JPG and PNG files are supported.`;
    }
    return `The image must be between ${minW}x${minH}px and ${maxW}x${maxH}px, and no larger than ${maxS}MB. Only JPG and PNG files are supported.`;
  },
  browseButton: 'BROWSE',
  removeButton: 'REMOVE',
  smallError: (minW, minH) => `The selected image is too small. It must be bigger than ${minW}x${minH}px.`,
  bigError: (maxW, maxH) => `The selected image is too big, It must be smaller than ${maxW}x${maxH}px.`,
  sizeError: (maxS) => `The selected file is too large. The file size must be lower than ${maxS}MB.`,
  typeError: 'The selected file type is not supported. Please use a JPG or PNG file.',
}
