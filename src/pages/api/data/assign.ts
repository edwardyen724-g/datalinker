import { NextApiRequest, NextApiResponse } from "next";
import { getFirebaseAdmin } from "../../../lib/firebaseAdmin"; // adjust the import path as necessary
import { verify } from "jsonwebtoken";

interface AuthedRequest extends NextApiRequest {
  user?: { id: string; email: string };
}

const firebaseAdmin = getFirebaseAdmin();

const assignData = async (req: AuthedRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Example authorization check using JWT
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const decoded = verify(token, process.env.JWT_SECRET || "");
    req.user = { id: (decoded as any).sub, email: (decoded as any).email }; // set user in request

    const { dataField, value } = req.body;

    if (!dataField || typeof value === "undefined") {
      return res.status(400).json({ message: "Missing dataField or value" });
    }

    // Example data assignment logic (adjust as necessary)
    const db = firebaseAdmin.firestore();
    const assignment = await db.collection("dataAssignments").add({
      userId: req.user.id,
      dataField,
      value,
    });

    return res.status(201).json({ id: assignment.id });
  } catch (err) {
    return res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  }
};

export default assignData;