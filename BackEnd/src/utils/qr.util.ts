import QRCode from "qrcode";

export const generateQRCode = async (text: string): Promise<string> => {
  try {
    // Data URL(Base64) 형태로 반환
    return await QRCode.toDataURL(text);
  } catch (err) {
    throw new Error("QR 코드 생성 실패");
  }
};
