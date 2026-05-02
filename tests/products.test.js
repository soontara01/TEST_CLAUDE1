const request = require('supertest');
const app = require('../app');
const Product = require('../models/product');

jest.mock('../models/product');

describe('GET /api/products', () => {
  afterEach(() => jest.clearAllMocks());

  it('returns 400 when key query param is missing', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('Query param "key" is required');
  });

  it('returns product when key exists', async () => {
    const mockProduct = { _id: 'abc123', key: 'PROD-001', name: 'Test Product', price: 199 };
    Product.findOne.mockReturnValue({ lean: jest.fn().mockResolvedValue(mockProduct) });

    const res = await request(app).get('/api/products?key=PROD-001');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.key).toBe('PROD-001');
  });

  it('returns 404 when key does not exist', async () => {
    Product.findOne.mockReturnValue({ lean: jest.fn().mockResolvedValue(null) });

    const res = await request(app).get('/api/products?key=NOTFOUND');
    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('Product with key "NOTFOUND" not found');
  });

  it('returns 500 on database error', async () => {
    Product.findOne.mockReturnValue({ lean: jest.fn().mockRejectedValue(new Error('DB error')) });

    const res = await request(app).get('/api/products?key=PROD-001');
    expect(res.statusCode).toBe(500);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('Database error');
  });
});
