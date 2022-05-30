type Fields = {
  name: string;
  config: {
    type: "int" | "varchar";
    size?: number;
    notNull?: true | undefined;
  };
  dependency?: {
    type: "isfk" | "ispk" | "multifk";
    table?: string;
    field?: string;
  };
};

type ResponseData = {
  status: boolean;
  errors?: string[];
  result?: any;
};

export { Fields, ResponseData };
