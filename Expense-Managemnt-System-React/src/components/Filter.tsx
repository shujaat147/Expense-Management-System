import { Categories } from "./Data";

interface Props{
    handleFilters: (SelectedOption:string) => void;
}

const Filter = ({handleFilters}: Props) => {
  return (
    <div className="print-hide">
      <label htmlFor="select" className="label-control mb-3">Select Category:</label>
      <select className="form-select bg-dark text-white" id="select" onChange={(e)=>handleFilters(e.target.value)}>
        <option value="all">View All</option>
        {
            Categories.map(cat=>(<option key={cat} value={cat}>{cat}</option>))
        }
      </select>
    </div>
  );
};

export default Filter;
