import { promises as fs } from "fs";

const filePath = "public/data/deviceTokens.json";

//디바이스 토큰 정보 확인
export const getDeviceTokens = async () => {
  return dataFileToJsonObject(filePath);
};

//디바이스 토큰 정보 저장
export const saveDeviceToken = async (
  deviceToken: string
): Promise<string[]> => {
  const data = await dataFileToJsonObject(filePath);

  if (!data.includes(deviceToken)) {
    data.push(deviceToken);
  }

  const updatedDataJSON = JSON.stringify(data, null, 2);
  await fs.writeFile(filePath, updatedDataJSON, "utf-8");

  return Promise.resolve(data);
};

//초기화
export const initFileData = async (): Promise<string[]> => {
  const updatedDataJSON = JSON.stringify([], null, 2);
  const data = await fs.writeFile(filePath, updatedDataJSON, "utf-8");
  return Promise.resolve([]);
};

//file to Json
const dataFileToJsonObject = async (path: string): Promise<string[]> => {
  const fileContents = await fs.readFile(path, "utf8");
  return JSON.parse(fileContents) as string[];
};
