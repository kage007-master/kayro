interface Data {
  _id: string;
  version: string;
  addr: string;
  status?: boolean;
  time: string;
}

interface IState {
  data: Data[];
  loading: boolean;
}

interface DecState {
  data: Data[];
  totalCnt: number;
  loading: boolean;
}
