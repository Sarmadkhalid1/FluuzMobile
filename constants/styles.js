import { StyleSheet } from "react-native";
export const primary_color = "#0058CA";
export const secondary_color = "#DFEFFF";

export default CustomStyles = StyleSheet.create({
  btn: ` bg-[${primary_color}] rounded-full items-center`,
  btnlight: ` bg-[${secondary_color}] rounded-full items-center`,
  btn_secondary: `bg-white rounded-full items-center`,
  text_primary: `text-[${primary_color}] font-bold`,
  input: `bg-[#EBF4FF] text-[#0058CA66] border border-[#0058CA4D]  rounded p-3`,
  input_label: `text-black`,
  input_field: `bg-[#EBF4FF] text-[#0058CA66] text-sm rounded-md border border-[#0058CA4D] w-full p-3.5`
});
