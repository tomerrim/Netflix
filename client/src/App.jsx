import { Outlet, useNavigate } from 'react-router-dom';
import './App.css'
import { Layout } from './components/Layout';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { customFetch } from './utils/customFetch';
// import { useDispatch } from 'react-redux';
// import { setContent, setMovies, setSeries } from './store/contentSlice';
// import { useEffect } from 'react';

function App() {
  // const dispatch = useDispatch();
  // // const { contentType } = useParams();
  // const fetchAllContent = async () => {
  //   try {
  //     const allContent = await customFetch("content", "GET");
  //     //console.log("all content:", allContent)
  //     dispatch(setContent(allContent));
  //     dispatch(setMovies(allContent));
  //     dispatch(setSeries(allContent));
  //   } catch (error) {
  //     console.log("Failed to fetch content");
  //   }
  // };

  // useEffect(() => {
  //   fetchAllContent();
  // }, [])

  const navigate = useNavigate();
  const user = useSelector(state => state.userSlice.user);
  useEffect(() => {
    if (!user) {
      navigate("/signIn");
    } 
  }, [user,navigate]);

  return (
    <div className="App">
      <Layout>
        <Outlet />
      </Layout>
    </div>
  );
}

export default App
