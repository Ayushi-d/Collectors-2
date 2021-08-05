import {RNS3} from 'react-native-aws3';
const options = {
  keyPrefix: 'post_image/',
  bucket: 'collectors-images',
  region: 'us-east-2',
  accessKey: 'AKIA5WHAMB7RDVEUQ47J',
  secretKey: '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',
  successActionStatus: 201,
  acl: 'private',
};

export function uploadFileToS3(file) {
  return RNS3.put(file, options);
}
