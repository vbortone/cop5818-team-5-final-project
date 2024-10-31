import { useState } from 'react';

const TestClientForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    retirementAge: '',
    jobTitle: '',
    income: '',
    currentSavings: '',
    savingsPercentage: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        console.log('Client data saved:', result.data);
      } else {
        console.error('Error saving client data:', result.error);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" />
      <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Enter your age" />
      <input type="number" name="retirementAge" value={formData.retirementAge} onChange={handleChange} placeholder="Enter retirement age" />
      <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} placeholder="Enter job title" />
      <input type="number" name="income" value={formData.income} onChange={handleChange} placeholder="Enter your income" />
      <input type="number" name="currentSavings" value={formData.currentSavings} onChange={handleChange} placeholder="Enter current savings" />
      <input type="number" name="savingsPercentage" value={formData.savingsPercentage} onChange={handleChange} placeholder="Enter savings percentage" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default TestClientForm;
