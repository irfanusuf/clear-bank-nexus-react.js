



export interface Transaction {
  _id: string;
  accountId: any;
  userId : any,
  type: 'deposit' | 'withdraw';
  amount: number;
  balanceBefore : number,
  balanceAfter : number,
  status: 'success' | 'pending' | 'failed';
  reason: string;
  createdAt: string;
}

export interface Account {
  _id: string;
  userId: any;
  accountNumber: string;
  type:string;
  currency: string;
  balance: number;
  status: 'active' | 'inactive' | 'frozen';
  closedAt : string;
  createdAt: string;
  updatedAt: string;

}


export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData {
  fullName: string;
  email: string;
  phone : string;
  password: string;
  confirmPassword: string;
}

export interface User {
  _id: string;
  name: string;
  fullName : string;
  email: string;
  role: 'customer' | 'admin';
  accountNumber?: string;
}

export interface TransferPayload {
  recipientAccount: string;
  amount: number;
  description?: string;
}