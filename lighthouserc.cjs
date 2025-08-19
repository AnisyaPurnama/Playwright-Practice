module.exports = {
  ci: {
    collect: {
      // Run Lighthouse on your app
      url: ['https://the-internet.herokuapp.com/'],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['warn', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: './lhci_reports',
      reportFilenamePattern: '%%PATHNAME%%-%%DATETIME%%.report.html',
    },
  },
};
