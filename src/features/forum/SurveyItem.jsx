
export const SurveyItem = ({ id, title, description, votes }) => {
    return (
        <label htmlFor={id} className="flex items-center cursor-pointer p-5 rounded-xl transition 
              border-2 border-gray-200 hover:border-red-500 
              has-[input:checked]:border-red-500 has-[input:checked]:bg-red-50">

            <input type="radio" name="issue" value="infrastruktur" id={id}
                className="w-5 h-5 text-red-500 rounded focus:ring-red-500" />

            <div className="ml-4 flex-1">
                <div className="font-black text-gray-900 text-lg">{title}</div>
                <div className="text-gray-600">{description}</div>
            </div>
            <div className="text-red-500 font-black text-lg" id={`${id}-votes`}>{votes} suara</div>
        </label>
    );
};
