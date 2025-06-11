import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Layout from "./components/Layout/Layout";
import Presentation from "./components/Presentation/Presentation";
import Counts from "./components/Counts/Counts";
import Awards from "./components/Awards/Awards";
import Order from "./components/Order/Order";


function App() {
  return (
    <div>
      <Header />
      <Presentation />
      <div className="line"/>
      <Layout />
      <Counts />
      <div className="line"/>
      <Awards />
      <Order />
      <Footer />
    </div>
  );
}

export default App;
