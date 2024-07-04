import Image from "next/image";

type Props = {
  src: string;
  alt: string;
};

const HeroImage = ({ src, alt }: Props) => {
  return (
    <div>
      <Image src={src} alt={alt} fill></Image>
    </div>
  );
};
export default HeroImage;
