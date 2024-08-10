import React, { useState } from 'react';
import Header from '../components/header/header';

function UploadProblem() {

    
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    question: '',
    description: '',
    inputTestCases: [{ input: '', output: '' }],
    difficulty: '',
  });

  function saveData(){
    let problems = {}
   const tempData=localStorage.getItem('formData');
    problems[formData.name] = {...formData}
    localStorage.setItem('formData', JSON.stringify({
      ...JSON.parse(tempData),
      ...problems
    }));

  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTestCaseChange = (index, e) => {
    const { name, value } = e.target;
    const updatedTestCases = formData.inputTestCases.map((testCase, i) =>
      i === index ? { ...testCase, [name]: value } : testCase
    );
    setFormData({ ...formData, inputTestCases: updatedTestCases });
  };

  const addTestCase = () => {
    setFormData({
      ...formData,
      inputTestCases: [...formData.inputTestCases, { input: '', output: '' }],
    });
  };

  const removeTestCase = (index) => {
    const updatedTestCases = formData.inputTestCases.filter((_, i) => i !== index);
    setFormData({ ...formData, inputTestCases: updatedTestCases });
  };

  return (
    <div>
        <Header></Header>
        <h2 className='font-bold text-center text-2xl pt-2'>Upload your Problem</h2>
    <div className="container mx-auto px-4 py-8 gap-4">
       
      <div className="">
        <form>
          <div className="mb-4 gap-4">
            <label htmlFor="id">ID</label>
            <input
              type="number"
              className="block w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              id="id"
              name="id"
              value={formData.id}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4 gap-4">
            <label htmlFor="question">Question</label>
            <input
              type="text"
              className="block w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              id="question"
              name="question"
              value={formData.question}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4 gap-4">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="block w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* Similar structure for questions and description */}

          <div className="mb-4 gap-4">
            <label htmlFor="description">Description</label>
            <textarea
              className="block w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="mb-4 gap-4">
            <label>Input Test Cases</label>
            {formData.inputTestCases.map((testCase, index) => (
              <div key={index} className=" flex flex-col mb-2 gap-4">
                <input
                  type="text"
                  className="block w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Input"
                  name="input"
                  value={testCase.input}
                  onChange={(e) => handleTestCaseChange(index, e)}
                />
                <input
                  type="text"
                  className="block w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Output"
                  name="output"
                  value={testCase.output}
                  onChange={(e) => handleTestCaseChange(index, e)}
                />
                <button
                  type="button"
                  className="bg-red-500 text-white px-4 py-2 rounded font-bold hover:bg-red-700 w-fit"
                  onClick={() => removeTestCase(index)}
                >
                  Remove Test Case
                </button>
              </div>
            ))}
            <button
              type="button"
              className="bg-green-500 text-white px-4 py-2 rounded font-bold hover:bg-green-700"
              onClick={addTestCase}
            >
              Add Test Case
            </button>
          </div>

          <div className="mb-4 gap-4">
            <label htmlFor="difficulty">Difficulty</label>
            <select
              className="block w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              id="difficulty"
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
            >
              <option value="">Select Difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <button type="submit" onClick={saveData} className="bg-blue-500 text-white px-4 py-2 rounded font-bold hover:bg-blue-700">
            Submit
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default UploadProblem;
