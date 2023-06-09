




"use client "
import useSWR from "swr"
import Select from 'react-select'

const fetchModels = () => fetch("/api/getEngines").then((res) => res.json());

const Ms = () => {
  const { data: models, isLoading } = useSWR("models", fetchModels);

  const { data: model, mutate: setModel } = useSWR("model", {
    fallbackData: "text-davinci-003",
  });

  return (
    <div>
      <Select
        
        className="mt-2 bg-[#434654] "
        options={models?.modelOptions}
        defaultValue={model}
        placeholder={model}
        isSearchable
        isLoading={isLoading}
        menuPosition="fixed"
        classNames={{
          control: (state) => "bg-[#434654] border-[#434654]",
        }}
        onChange={(e) => setModel(e.value)}
      />
    </div>
  );
};

export default Ms;
