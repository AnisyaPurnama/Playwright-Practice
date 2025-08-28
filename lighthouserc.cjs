module.exports = {
  ci: {
    collect: {
      url: ['https://the-internet.herokuapp.com/'],
      numberOfRuns: 3,
      // outputDir: '.lighthouseci', // optional, default is already .lighthouseci
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.55 }],
        'categories:accessibility': ['warn', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: '.lighthouseci',
      reportFilenamePattern: '%%PATHNAME%%-%%DATETIME%%.report.html',
    },
  },
};
