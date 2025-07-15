export interface EmergencyContact {
  id: number;
  name: string;
  phone: string;
}

export interface SOSPayload {
  location: {
    lat: number;
    lng: number;
  } | null;
  battery: number | null;
  frontCameraImage: string | null;
  backCameraImage: string | null;
  sosMessage: string;
  error?: string;
}
