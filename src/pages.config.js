import Home from './pages/Home';
import Explore from './pages/Explore';
import Create from './pages/Create';
import Marketplace from './pages/Marketplace';
import Profile from './pages/Profile';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "Explore": Explore,
    "Create": Create,
    "Marketplace": Marketplace,
    "Profile": Profile,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};