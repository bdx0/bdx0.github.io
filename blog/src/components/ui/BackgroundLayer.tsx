import ParticleLayer from "./ParticleLayer";

type Props = React.PropsWithChildren<{}>;

export default function BackgroundLayout({ children }: Props) {
  return (
    <div className="background">
      <ParticleLayer />
      <div className="">{children}</div>
    </div>
  );
}
