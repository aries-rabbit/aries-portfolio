import './App.scss';

import { Navbar } from './components';
import { About, Footer, Header, Testimonial, Work, Skills } from './container';

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Header />
      <About />
      <Work />
      <Skills />
      <Testimonial />
      <Footer />
    </div>
  );
};

export default App;
