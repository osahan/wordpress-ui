import React, { useState } from 'react';
import { Panel, PanelBody } from '@wordpress/components';

interface FieldDebugInfoProps {
  id: string;
  schema: any;
  uiSchema?: any;
  formData?: any;
  idSchema?: any;
}

// Helper to safely get ID from idSchema
const getIdFromSchema = (id: string, idSchema?: any): string => {
  if (idSchema?.$id) {
    return idSchema.$id;
  }
  return id;
}

const FieldDebugInfo: React.FC<FieldDebugInfoProps> = ({
  id,
  schema,
  uiSchema,
  formData,
  idSchema,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <div style={{ marginTop: '8px', marginBottom: '8px' }}>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          style={{
            fontSize: '11px',
            padding: '4px 8px',
            background: '#f0f0f1',
            border: '1px solid #c3c4c7',
            borderRadius: '2px',
            cursor: 'pointer',
            color: '#50575e',
          }}
        >
          🔍 Debug Info
        </button>
      </div>
    );
  }

  return (
    <div style={{ marginTop: '8px', marginBottom: '8px' }}>
      <Panel>
        <PanelBody
          title="🔍 Debug Info"
          initialOpen={true}
        >
          <div style={{ fontSize: '12px', fontFamily: 'monospace' }}>
            <div style={{ marginBottom: '12px' }}>
              <strong style={{ display: 'block', marginBottom: '4px', color: '#1e1e1e' }}>
                Field ID:
              </strong>
              <pre style={{ 
                background: '#f0f0f1', 
                padding: '8px', 
                borderRadius: '2px',
                overflow: 'auto',
                margin: 0,
                fontSize: '11px'
              }}>
                {getIdFromSchema(id, idSchema)}
              </pre>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <strong style={{ display: 'block', marginBottom: '4px', color: '#1e1e1e' }}>
                JSON Schema:
              </strong>
              <pre style={{ 
                background: '#f0f0f1', 
                padding: '8px', 
                borderRadius: '2px',
                overflow: 'auto',
                margin: 0,
                fontSize: '11px',
                maxHeight: '300px'
              }}>
                {schema ? JSON.stringify(schema, null, 2) : '(no schema)'}
              </pre>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <strong style={{ display: 'block', marginBottom: '4px', color: '#1e1e1e' }}>
                UI Schema:
              </strong>
              <pre style={{ 
                background: '#f0f0f1', 
                padding: '8px', 
                borderRadius: '2px',
                overflow: 'auto',
                margin: 0,
                fontSize: '11px',
                maxHeight: '300px'
              }}>
                {uiSchema ? JSON.stringify(uiSchema, null, 2) : '(no uiSchema)'}
              </pre>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <strong style={{ display: 'block', marginBottom: '4px', color: '#1e1e1e' }}>
                Form Data (Current Value):
              </strong>
              <pre style={{ 
                background: '#f0f0f1', 
                padding: '8px', 
                borderRadius: '2px',
                overflow: 'auto',
                margin: 0,
                fontSize: '11px',
                maxHeight: '300px'
              }}>
                {formData !== undefined 
                  ? JSON.stringify(formData, null, 2) 
                  : formData === null 
                    ? 'null' 
                    : '(undefined - no value set)'}
              </pre>
            </div>

            {idSchema && (
              <div style={{ marginBottom: '12px' }}>
                <strong style={{ display: 'block', marginBottom: '4px', color: '#1e1e1e' }}>
                  ID Schema:
                </strong>
                <pre style={{ 
                  background: '#f0f0f1', 
                  padding: '8px', 
                  borderRadius: '2px',
                  overflow: 'auto',
                  margin: 0,
                  fontSize: '11px',
                  maxHeight: '200px'
                }}>
                  {JSON.stringify(idSchema, null, 2)}
                </pre>
              </div>
            )}

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              style={{
                fontSize: '11px',
                padding: '4px 8px',
                background: '#f0f0f1',
                border: '1px solid #c3c4c7',
                borderRadius: '2px',
                cursor: 'pointer',
                color: '#50575e',
                marginTop: '8px'
              }}
            >
              Hide Debug Info
            </button>
          </div>
        </PanelBody>
      </Panel>
    </div>
  );
};

export default FieldDebugInfo;
