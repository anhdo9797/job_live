const mock_token = 'mock_token';
const mock_access_token = 'mock_access_token';

export { mock_token, mock_access_token };

export const mockJwtService = {
  sign: jest.fn().mockReturnValue(mock_token),
};
