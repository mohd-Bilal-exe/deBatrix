import MainText from "./components/home-components/MainText";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import BoxContainer from "./components/home-components/BoxContainer";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen font-clash-grotesk">
      <Header />
      <MainText/>
      <BoxContainer/>
      <Footer />
    </div>
  );
}
