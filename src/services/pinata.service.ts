import { envConfig } from "@/config/envConfig";
import pinata from "@/config/pinataConfig";

type IAttribute = {
  trait_type: string;
  value: string;
};

type TMetadata = {
  name: string;
  description: string;
  image: string;
  attributes: IAttribute[];
};

const PinataService = {
  async uplaodFile(metadata: TMetadata) {
    const upload = await pinata.upload.json(metadata, { pinType: "cidOnly" });
    return upload;
  },

  getFile(cid: string) {
    return `https://${envConfig.GATEWAY_URL}/ipfs/${cid}`;
  },
};

export default PinataService;
