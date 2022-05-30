type Fields = {
  name: string;
  config: {
    type: "int" | "varchar";
    size?: number;
    notNull?: true;
  };
  dependency?: {
    type: "isfk" | "ispk"; // | "multifk";
    table?: string;
    field?: string;
    force?: true
  };
};

type ResponseData = {
  status: boolean;
  errors?: string[];
  result?: any;
};

export { Fields, ResponseData };
