window.matchMedia = jest
  .fn()
  .mockImplementation(query => {
    return {
      matches: true,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    }
  })
export {}
