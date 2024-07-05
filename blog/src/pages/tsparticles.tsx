import { type Container, type ISourceOptions } from "@tsparticles/engine";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useMemo, useState } from "react";
// import { loadAll } from "@tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
import { LoremIpsum } from "lorem-ipsum";
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.
import particle_config from "@/public/data/particle_config.json";

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 18,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

const App = () => {
  const [init, setInit] = useState(false);
  const title = lorem.generateSentences(1);
  const content = lorem.generateParagraphs(10);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine: any) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  const options: ISourceOptions = useMemo(
    () => particle_config as ISourceOptions,
    []
  );

  if (init) {
    return (
      <div className="p-4 flex flex-col">
        <div className="flex ">
          <Particles
            className="z-[-1]"
            id="tsparticles"
            particlesLoaded={particlesLoaded}
            options={options}
          />
        </div>
        <div className="flex flex-col text-white p-10">
          <div className="text-2xl text-white mb-10">${title}</div>
          {content.split("\n").map((para, i) => (
            <p key={`${title}-${i}`}>${para}</p>
          ))}
        </div>
      </div>
    );
  }

  return <></>;
};
export default App;
