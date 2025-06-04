import React from 'react';

export default function RecruitmentFunnel({ stages, activeStage, onStageChange }) {
  return (
    <div style={styles.funnelContainer}>
      <div style={styles.progressBarContainer}>
        <div style={styles.progressBar}>
          {stages.map((stage, index) => {
            const isActive = activeStage === stage.id;
            const isPast = stages.findIndex(s => s.id === activeStage) > index;
            
            return (
              <React.Fragment key={stage.id}>
                {index > 0 && (
                  <div 
                    style={{
                      ...styles.progressConnector,
                      backgroundColor: isPast ? '#1e40af' : '#94a3b8',
                    }}
                  />
                )}
                <div 
                  style={{
                    ...styles.progressStage,
                    backgroundColor: isActive ? '#1e40af' : isPast ? '#3b82f6' : '#94a3b8',
                    cursor: 'pointer',
                  }}
                  onClick={() => onStageChange(stage.id)}
                >
                  <div style={styles.stageNumberContainer}>
                    <div style={styles.stageNumber}>{index + 1}</div>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
      
      <div style={styles.stagesLabelContainer}>
        {stages.map((stage, index) => (
          <div 
            key={stage.id}
            style={{
              ...styles.stageLabelWrapper,
              width: `${100 / stages.length}%`,
              ...(index === 0 ? { textAlign: 'left', paddingLeft: '15px' } : {}),
              ...(index === stages.length - 1 ? { textAlign: 'right', paddingRight: '15px' } : {}),
            }}
          >
            <div 
              style={{
                ...styles.stageLabel,
                color: activeStage === stage.id ? '#1e40af' : '#64748b',
                fontWeight: activeStage === stage.id ? '600' : '400',
              }}
              onClick={() => onStageChange(stage.id)}
            >
              <div style={styles.stageName}>{stage.name}</div>
              <div style={styles.stageCount}>{stage.count} candidates</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  funnelContainer: {
    width: '100%',
    padding: '1.25rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  progressBarContainer: {
    padding: '0 1.5rem',
    marginBottom: '1.5rem',
  },
  progressBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    margin: '0 auto',
    width: '95%',
  },
  progressStage: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    transition: 'all 0.2s ease',
  },
  stageNumberContainer: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stageNumber: {
    color: '#1e293b',
    fontWeight: '600',
    fontSize: '0.9rem',
  },
  progressConnector: {
    flex: 1,
    height: '4px',
    marginLeft: '-1px',
    marginRight: '-1px',
    zIndex: 0,
  },
  stagesLabelContainer: {
    display: 'flex',
    width: '100%',
    padding: '0 1rem',
  },
  stageLabelWrapper: {
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
  },
  stageLabel: {
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    width: '100%',
  },
  stageName: {
    fontSize: '0.85rem',
    marginBottom: '0.25rem',
  },
  stageCount: {
    fontSize: '0.75rem',
    color: '#94a3b8',
  },
}; 