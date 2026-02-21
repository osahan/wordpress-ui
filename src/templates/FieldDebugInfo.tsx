import React, { useState } from 'react';
import { Panel, PanelBody } from '@wordpress/components';

interface FieldDebugInfoProps {
    formData?: any;
    id: string;
    idSchema?: any;
    schema: any;
    uiSchema?: any;
}

// Helper to safely get ID from idSchema
const getIdFromSchema = (id: string, idSchema?: any): string => {
    if (idSchema?.$id) {
        return idSchema.$id;
    }
    return id;
};

const FieldDebugInfo: React.FC<FieldDebugInfoProps> = ({ formData, id, idSchema, schema, uiSchema }) => {
    const [isOpen, setIsOpen] = useState(false);

    if (!isOpen) {
        return (
            <div style={{ marginBottom: '8px', marginTop: '8px' }}>
                <button
                    onClick={() => setIsOpen(true)}
                    style={{
                        background: '#f0f0f1',
                        border: '1px solid #c3c4c7',
                        borderRadius: '2px',
                        color: '#50575e',
                        cursor: 'pointer',
                        fontSize: '11px',
                        padding: '4px 8px',
                    }}
                    type="button"
                >
                    🔍 Debug Info
                </button>
            </div>
        );
    }

    return (
        <div style={{ marginBottom: '8px', marginTop: '8px' }}>
            <Panel>
                <PanelBody initialOpen={true} title="🔍 Debug Info">
                    <div style={{ fontFamily: 'monospace', fontSize: '12px' }}>
                        <div style={{ marginBottom: '12px' }}>
                            <strong style={{ color: '#1e1e1e', display: 'block', marginBottom: '4px' }}>
                                Field ID:
                            </strong>
                            <pre
                                style={{
                                    background: '#f0f0f1',
                                    borderRadius: '2px',
                                    fontSize: '11px',
                                    margin: 0,
                                    overflow: 'auto',
                                    padding: '8px',
                                }}
                            >
                                {getIdFromSchema(id, idSchema)}
                            </pre>
                        </div>

                        <div style={{ marginBottom: '12px' }}>
                            <strong style={{ color: '#1e1e1e', display: 'block', marginBottom: '4px' }}>
                                JSON Schema:
                            </strong>
                            <pre
                                style={{
                                    background: '#f0f0f1',
                                    borderRadius: '2px',
                                    fontSize: '11px',
                                    margin: 0,
                                    maxHeight: '300px',
                                    overflow: 'auto',
                                    padding: '8px',
                                }}
                            >
                                {schema ? JSON.stringify(schema, null, 2) : '(no schema)'}
                            </pre>
                        </div>

                        <div style={{ marginBottom: '12px' }}>
                            <strong style={{ color: '#1e1e1e', display: 'block', marginBottom: '4px' }}>
                                UI Schema:
                            </strong>
                            <pre
                                style={{
                                    background: '#f0f0f1',
                                    borderRadius: '2px',
                                    fontSize: '11px',
                                    margin: 0,
                                    maxHeight: '300px',
                                    overflow: 'auto',
                                    padding: '8px',
                                }}
                            >
                                {uiSchema ? JSON.stringify(uiSchema, null, 2) : '(no uiSchema)'}
                            </pre>
                        </div>

                        <div style={{ marginBottom: '12px' }}>
                            <strong style={{ color: '#1e1e1e', display: 'block', marginBottom: '4px' }}>
                                Form Data (Current Value):
                            </strong>
                            <pre
                                style={{
                                    background: '#f0f0f1',
                                    borderRadius: '2px',
                                    fontSize: '11px',
                                    margin: 0,
                                    maxHeight: '300px',
                                    overflow: 'auto',
                                    padding: '8px',
                                }}
                            >
                                {formData !== undefined
                                    ? JSON.stringify(formData, null, 2)
                                    : formData === null
                                      ? 'null'
                                      : '(undefined - no value set)'}
                            </pre>
                        </div>

                        {idSchema && (
                            <div style={{ marginBottom: '12px' }}>
                                <strong style={{ color: '#1e1e1e', display: 'block', marginBottom: '4px' }}>
                                    ID Schema:
                                </strong>
                                <pre
                                    style={{
                                        background: '#f0f0f1',
                                        borderRadius: '2px',
                                        fontSize: '11px',
                                        margin: 0,
                                        maxHeight: '200px',
                                        overflow: 'auto',
                                        padding: '8px',
                                    }}
                                >
                                    {JSON.stringify(idSchema, null, 2)}
                                </pre>
                            </div>
                        )}

                        <button
                            onClick={() => setIsOpen(false)}
                            style={{
                                background: '#f0f0f1',
                                border: '1px solid #c3c4c7',
                                borderRadius: '2px',
                                color: '#50575e',
                                cursor: 'pointer',
                                fontSize: '11px',
                                marginTop: '8px',
                                padding: '4px 8px',
                            }}
                            type="button"
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
