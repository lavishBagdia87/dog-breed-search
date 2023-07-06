import { useSelector } from "react-redux";
import BreedRow from "../BreedRow/BreedRow";
import "./BreedData.css";
const BreedData = () => {
  const breeds = useSelector((state) => state.breeds);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {breeds && breeds.length>0 && breeds.map((result) => {
        return (
          <div key={result.id}>
            <BreedRow data={result} />
          </div>
        );
      })}
      {!loading && breeds && breeds.length === 0 && (
        <div className="waring-message">No Records Found.</div>
      )}
    </>
  );
};
export default BreedData;
