import { useEffect, useState } from "react";
import axios from "axios";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./app.css";
import { Slider, Typography } from "@mui/material";

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState("");
  const [experienceLevel, setExperienceLevel] = useState(0);
  const [summary, setSummary] = useState("");
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    if (selectedFile) {
      console.log("Selected file:", selectedFile);
    }
  }, [selectedFile]);

  useEffect(() => {
    console.log("Experience level:", experienceLevel);
  }, [experienceLevel]);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement> | null,
  ) => {
    setSummary("");
    if (!event?.target.files) return;

    const file = event.target.files[0];

    if (file.type !== "application/pdf") {
      alert("Please select a PDF file.");
      return;
    }

    // if (file.size > 1024 * 1024) {
    //   alert("File size should not exceed 1MB.");
    //   return;
    // }

    // Perform further processing or upload the file
    setSelectedFile(file);
  };

  const processQuery = async (data) => {
    try {
      setSpinner(true);
      setUploadError("");
      // Assuming 'data' contains necessary information for the request
      // Adjust the URL and payload as needed for your specific endpoint and data structure
      const queryResponse = await axios.post("api/processQuery", data);
      console.log("Query processed successfully:", queryResponse.data);
      // Handle successful query processing here, e.g., update state or UI
    } catch (error) {
      setSpinner(false);
      console.error("Error processing query:", error);
      // Handle errors from the query processing request here
      setUploadError("Error processing query. Please try again.");
      setSelectedFile(null);
    }
  };

  const onFileUpload = async () => {
    setSpinner(true);
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("myFile", selectedFile, selectedFile.name);

    try {
      const uploadResponse = await axios.post("api/uploadfile", formData);
      if (uploadResponse.data) {
        console.log(uploadResponse.data);
        setSummary(uploadResponse.data);
        // Call processQuery function with the upload response data
        await processQuery(uploadResponse.data);
        // Reset or clear error message
        setUploadError("");
      }
    } catch (error) {
      setSpinner(false);
      console.log("ERROR");
      // Handle error
      console.error("Error uploading file:", error);
      // Update state with error message
      setUploadError("Error uploading file. Please try again.");
      setSelectedFile(null);
    }
  };

  function valuetext(value: number) {
    switch (value) {
      case 0:
        return "novice";
      case 50:
        return "intermediate";
      case 100:
        return "expert";
      default:
        return "novice";
    }
  }

  function valueemoji(value: number) {
    switch (value) {
      case 0:
        return "🐣 novice";
      case 50:
        return "🐥 intermediate";
      case 100:
        return "🦅 expert";
      default:
    }
    return "🐣";
  }

  return (
    <>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div> */}
      <h1 className="p-[20px]">{import.meta.env.VITE_ENV_EXAMPLE}</h1>
      <p className="p-[20px]">Upload a research paper in pdf format.</p>
      {!selectedFile && (
        <input
          type="file"
          accept=".pdf"
          onChange={(event) => handleFileChange(event)}
        />
      )}
      {selectedFile && (
        <div>
          <Typography id="non-linear-slider" gutterBottom>
            Experience Level
          </Typography>
          <Slider
            aria-label="Level"
            defaultValue={0}
            getAriaValueText={valuetext}
            valueLabelFormat={valueemoji}
            valueLabelDisplay="auto"
            shiftStep={50}
            step={50}
            marks
            min={0}
            max={100}
            // invoked when the user drags the thumb
            onChange={(_, newValue) => setExperienceLevel(newValue)}
            // invoked when the user drops the thumb
            onChangeCommitted={(_, newValue) => setExperienceLevel(newValue)}
          />
        </div>
      )}

      <div className="card">
        {!spinner && selectedFile && (
          <button onClick={onFileUpload}>Upload!</button>
        )}
        {spinner && (
          <div role="status" className="flex justify-center">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        )}
        {summary && (
          <div>
            <div className="font-bold">Summary:</div>
            {summary}
          </div>
        )}
      </div>

      <div>
        {uploadError && <div className="error text-red-500">{uploadError}</div>}
      </div>
    </>
  );
}

export default App;
