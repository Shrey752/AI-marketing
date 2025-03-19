import { Request, Response } from 'express';
import { generateContent } from '../controllers/instagramController';
import OpenAI from 'openai';

// Mock OpenAI
jest.mock('openai', () => {
  return jest.fn().mockImplementation(() => ({
    chat: {
      completions: {
        create: jest.fn().mockResolvedValue({
          choices: [{
            message: {
              content: 'Test caption #test #hashtag'
            }
          }]
        })
      }
    },
    images: {
      generate: jest.fn().mockResolvedValue({
        data: [{
          url: 'https://test-image-url.com'
        }]
      })
    }
  }));
});

describe('Instagram Controller', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    mockReq = {
      body: {
        businessType: 'Test Business'
      }
    };
    mockRes = {
      json: jsonMock,
      status: statusMock
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should generate Instagram content successfully', async () => {
    await generateContent(mockReq as Request, mockRes as Response);

    expect(statusMock).not.toHaveBeenCalled();
    expect(jsonMock).toHaveBeenCalledWith({
      caption: 'Test caption #test #hashtag',
      hashtags: ['test', 'hashtag'],
      imageUrl: 'https://test-image-url.com'
    });
  });

  it('should handle errors when generating content', async () => {
    const error = new Error('API Error');
    (OpenAI as jest.Mock).mockImplementationOnce(() => {
      throw error;
    });

    await generateContent(mockReq as Request, mockRes as Response);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({
      error: 'Failed to generate content'
    });
  });
}); 