import { PinataService } from "@/services";

type TokenUriProps = {
  name: string;
  description: string;
  image: string;
  category: string;
  currencyType: string;
  price: string;
};

export default async function createTokenUri({
  name,
  description,
  image,
  category,
  currencyType,
  price,
}: TokenUriProps): Promise<string> {
  const res = await PinataService.uplaodFile({
    name,
    description,
    image,
    attributes: [
      {
        trait_type: "Category",
        value: category,
      },
      {
        trait_type: "Token",
        value: currencyType,
      },
      {
        trait_type: "Price",
        value: price,
      },
    ],
  });

  const TOKEN_URI = PinataService.getFile(res.IpfsHash);

  return TOKEN_URI;
}
