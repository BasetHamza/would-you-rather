import NavigationBar from "../components/NavigationBar";


function NotFound() {
  return (
    <>
      <NavigationBar />
      <div className="not-found-content">
        <span className="not-found-code">404</span> page not found
      </div>
    </>
  );
}

export default NotFound;