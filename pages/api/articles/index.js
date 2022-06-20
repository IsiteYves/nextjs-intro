import { articles } from "../../../data";

export default function apifunc(req, res) {
  res.status(200).json(articles);
}
