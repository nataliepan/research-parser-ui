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

  const onFileUpload = () => {
    if (!selectedFile) return;

    setUploadError("");

    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append("myFile", selectedFile, selectedFile.name);

    // Details of the uploaded file
    console.log(selectedFile);

    // Request made to the backend api
    // Send formData object
    axios
      .post("api/uploadfile", formData)
      .then((response) => {
        // Handle response
        console.log(response.data);
        setSummary(response.data);
        // Reset or clear error message
        setUploadError("");
      })
      .catch((error) => {
        console.log("ERROR");
        // Handle error
        console.error("Error uploading file:", error);
        // Update state with error message
        setUploadError("Error uploading file. Please try again.");
      });
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
        {!uploadError && selectedFile && (
          <button onClick={onFileUpload}>Upload!</button>
        )}
      </div>
      <div>
        {uploadError && <div className="error text-red-500">{uploadError}</div>}
      </div>
    </>
  );
}

export default App;
