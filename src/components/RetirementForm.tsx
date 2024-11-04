export default function RetirementForm() {
  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Enter Retirement Information</h2>
      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1 font-medium">Age</label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your age"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Retirement Age</label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter retirement age"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">
              Job Title/Profession
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your job title or profession"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Income</label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your income"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Savings</label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your current savings"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Savings Percentage</label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter savings percentage"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
