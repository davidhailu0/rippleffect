import Answer from "@/types/Answers";
import Survey from "@/types/Survey";
import TextField from "./SurveyTextfield";
import { ChangeEvent } from "react";

export default function SurveyQuestion({
  survey,
  selectedValue,
  handleOnChange,
  handleNext,
}: {
  survey: Survey;
  selectedValue: Answer | null;
  handleOnChange: (val: Answer) => void;
  handleNext: () => void;
}) {
  return (
    <>
      {survey.question_type === "multiple_choice" && (
        <p className="text-pink-400">{survey.title}</p>
      )}
      {survey.question_type === "multiple_choice" ? (
        <div className="grid grid-cols-4 space-x-3">
          {Object.entries(survey.choices).map(([key, value]) => (
            <label key={key} className="inline-flex items-center">
              <input
                type="radio"
                name={key}
                value={value}
                checked={selectedValue?.response === value}
                onChange={() =>
                  handleOnChange({ question_id: survey.id, response: value })
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" && selectedValue?.response === value) {
                    handleNext();
                  }
                }}
                className="form-radio h-4 w-4 text-pink-600 transition duration-150 ease-in-out"
              />
              <span className="ml-2 text-gray-700">{value}</span>
            </label>
          ))}
        </div>
      ) : (
        <TextField
          label={survey.title}
          value={selectedValue?.response}
          placeholder={survey.title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleOnChange({ question_id: survey.id, response: e.target.value })
          }
          onEnterPressed={handleNext}
        />
      )}
    </>
  );
}
