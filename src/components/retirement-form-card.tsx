import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type RetirementFormProps = {
  onSubmit: (formData: FormData) => Promise<void>;
};

export default function RetirementFormCard(props: RetirementFormProps) {
  return (
    <Card className="my-6">
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          Enter Retirement Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form action={props.onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                name="name"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Age</label>
              <input
                type="number"
                name="age"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter your age"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Retirement Age</label>
              <input
                type="number"
                name="retirementAge"
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
                name="jobTitle"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter your job title or profession"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Income</label>
              <input
                type="number"
                name="income"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter your income"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Savings</label>
              <input
                type="number"
                name="savings"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter your current savings"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">
                Savings Percentage
              </label>
              <input
                type="number"
                name="savingsPercentage"
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
      </CardContent>
    </Card>
  );
}
