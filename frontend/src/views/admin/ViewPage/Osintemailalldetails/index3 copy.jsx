import React, { useEffect, useRef } from 'react';
import ForceGraph3D from '3d-force-graph';
// import Demo from 'Demo.json';
import moment from 'moment';
import { FaMobileAlt, FaUser, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaGlobe, FaBuilding } from 'react-icons/fa';
import * as THREE from 'three';
import SpriteText from 'three-spritetext';
import * as d3 from 'd3';
import Demo from 'Demo/125_phone_response.json';


export default function OsintemailalldetailsChart() {
    const containerRef = useRef();
    const graphRef = useRef(null); // Add ref for the graph instance

    // Move data transformation to a separate function
    const transformData = () => {
        const rootId = `${Demo?.criteria}`;
        const graphData = {
            nodes: [],
            links: []
        };

        // Add root node only once
        graphData.nodes.push({
            id: rootId,
            group: 0,
            name: rootId
        });

        Demo?.data?.forEach((dataEntry) => {
            if (dataEntry.luna && dataEntry.luna.person) {
                Object.entries(dataEntry.luna.person).forEach(([key, value]) => {
                    const parentId = `${key} (${Array.isArray(value) ? value.length : 0})`;
                    graphData.nodes.push({
                        id: parentId,
                        group: 1,
                        name: parentId
                    });
                    graphData.links.push({ source: rootId, target: parentId });

                    if (Array.isArray(value)) {
                        value.forEach((item) => {
                            let displayName = '';
                            if (typeof item === 'object' && item !== null) {
                                displayName = Object.entries(item)
                                    .filter(([k, _]) => k !== 'searchable')
                                    .map(([k, v]) => {
                                        if (v) {
                                            if (typeof v === 'object' && v !== null) {
                                                // Handle nested object
                                                return Object.entries(v)
                                                    .map(([nestedKey, nestedValue]) => {
                                                        if (nestedValue) {
                                                            if (['validSince', 'lastSeen', 'start', 'end'].includes(nestedKey)) {
                                                                return `${k}.${nestedKey}: ${moment(nestedValue).format('lll')}`;
                                                            }
                                                            return `${k}.${nestedKey}: ${String(nestedValue)}`;
                                                        }
                                                        return null;
                                                    })
                                                    .filter(Boolean)
                                                    .join(' | ');
                                            } if (['validSince', 'lastSeen', 'start', 'end'].includes(k)) {
                                                return `${k}: ${moment(v).format('lll')}`;
                                            }
                                            return `${k}: ${String(v)}`;
                                        }
                                        return null;
                                    })
                                    .filter(Boolean)
                                    .join(' | ');
                            } else {
                                displayName = String(item);
                            }
                            if (displayName) {
                                graphData.nodes.push({
                                    id: displayName,
                                    group: 2,
                                    name: displayName
                                });
                                graphData.links.push({ source: parentId, target: displayName });
                            }
                        });
                    }
                });
            }
        });

        return graphData;
    };

    const formatText = (text) => {
        // Format key-value pairs more clearly
        if (text.includes(':')) {
            const [key, value] = text.split(':').map(s => s.trim());
            return { key, value };
        }
        return { key: '', value: text };
    };

    const getNodeIcon = (text) => {
        const lowerText = text.toLowerCase();
        if (lowerText.includes('email')) return '📧';
        if (lowerText.includes('address')) return '📍';
        if (lowerText.includes('date') || lowerText.includes('seen')) return '📅';
        if (lowerText.includes('name')) return '👤';
        if (lowerText.includes('company')) return '🏢';
        if (lowerText.includes('website') || lowerText.includes('url')) return '🌐';
        if (lowerText.includes('phone')) return '📱';
        return '📄';
    };

    // First useEffect to initialize the graph
    useEffect(() => {
        if (!containerRef.current) return;

        // Initialize graph with initial data
        const Graph = ForceGraph3D()(containerRef.current);
        graphRef.current = Graph;

        // Initial graph setup
        Graph
            .graphData(transformData())
            .d3Force('charge', d3.forceManyBody().strength(-300))
            .d3Force('link', d3.forceLink()
                .id(d => d.id)
                .distance(d => d.source.group === 0 ? 200 : 100)
            )
            .d3Force('center', d3.forceCenter(0, 0, 0))
            .d3Force('collision', d3.forceCollide(node => node.group === 0 ? 50 : 30))
            .nodeThreeObject(node => {
                const group = new THREE.Group();

                if (node.group === 0) {
                    // Root node (phone number)
                    const sprite = new SpriteText('📱');
                    sprite.material.depthWrite = false;
                    sprite.scale.set(12, 12, 1);
                    group.add(sprite);
                } else {
                    // Create card for data
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    const fontSize = node.group === 1 ? 16 : 14;
                    context.font = `${fontSize}px Arial`;

                    // Process and format the text
                    const lines = node.name.split('|').map(line => line.trim());
                    const formattedLines = lines.map(line => formatText(line));

                    // Calculate maximum widths for proper alignment
                    const maxKeyWidth = Math.max(...formattedLines
                        .map(line => line.key ? context.measureText(line.key + ': ').width : 0));
                    const maxValueWidth = Math.max(...formattedLines
                        .map(line => context.measureText(line.value).width));

                    // Set canvas dimensions
                    const lineHeight = fontSize * 1.5;
                    const padding = 20;
                    const iconWidth = fontSize * 1.5;
                    const totalWidth = iconWidth + padding * 2 + maxKeyWidth + maxValueWidth;
                    const totalHeight = (lineHeight * lines.length) + (padding * 2);

                    canvas.width = totalWidth;
                    canvas.height = totalHeight;

                    // Draw background
                    context.fillStyle = 'rgba(17, 25, 25, 0.95)';
                    context.fillRect(0, 0, canvas.width, canvas.height);

                    // Draw neon border
                    const borderColor = node.group === 1 ? '#00ffff' : '#00ff9d';
                    context.strokeStyle = borderColor;
                    context.lineWidth = 2;
                    context.strokeRect(2, 2, canvas.width - 4, canvas.height - 4);

                    // Add glow effect
                    context.shadowColor = borderColor;
                    context.shadowBlur = 5;
                    context.strokeRect(2, 2, canvas.width - 4, canvas.height - 4);

                    // Draw text and icons
                    formattedLines.forEach((line, index) => {
                        const y = padding + (index * lineHeight);

                        // Draw icon
                        context.fillStyle = '#ffffff';
                        context.font = `${fontSize}px Arial`;
                        const icon = getNodeIcon(line.key || line.value);
                        context.fillText(icon, padding, y + fontSize);

                        // Draw key (if exists)
                        if (line.key) {
                            context.fillStyle = '#00ffff';
                            context.font = `bold ${fontSize}px Arial`;
                            context.fillText(
                                line.key + ':',
                                padding + iconWidth,
                                y + fontSize
                            );
                        }

                        // Draw value
                        context.fillStyle = '#ffffff';
                        context.font = `${fontSize}px Arial`;
                        context.fillText(
                            line.value,
                            padding + iconWidth + (line.key ? maxKeyWidth + 10 : 0),
                            y + fontSize
                        );
                    });

                    // Create sprite from canvas
                    const texture = new THREE.CanvasTexture(canvas);
                    const material = new THREE.SpriteMaterial({
                        map: texture,
                        transparent: true
                    });
                    const sprite = new THREE.Sprite(material);

                    // Scale sprite
                    const scaleFactor = node.group === 1 ? 10 : 8;
                    sprite.scale.set(
                        (canvas.width / fontSize) * scaleFactor * 0.5,
                        (canvas.height / fontSize) * scaleFactor * 0.5,
                        1
                    );

                    group.add(sprite);
                }

                return group;
            })
            .onNodeClick((node, event) => {
                // Stop event propagation
                event.stopPropagation();

                // Calculate new camera position
                const distance = 120;
                const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

                // Aim at node from outside
                const newPosition = {
                    x: node.x * distRatio,
                    y: node.y * distRatio,
                    z: node.z * distRatio
                };

                // Animate camera to new position
                Graph.cameraPosition(
                    newPosition,
                    node, // lookAt ({ x, y, z })
                    2000  // ms transition duration
                );
            })
            .onBackgroundClick(() => {
                // Reset camera position on background click
                Graph.cameraPosition(
                    { x: 0, y: 0, z: 600 }, // default position
                    { x: 0, y: 0, z: 0 }, // lookAt center
                    2000 // ms transition duration
                );
            })
            .linkWidth(1)
            .linkColor(() => 'rgba(0, 255, 255, 0.5)')
            .backgroundColor('#111919')
            .width(containerRef.current.clientWidth <= 1200 ? containerRef.current.clientWidth : containerRef.current.clientWidth - 214)
            .height(window.innerHeight)
            .showNavInfo(true)
            .linkDirectionalParticles(2)
            .linkDirectionalParticleWidth(2)
            .linkDirectionalParticleColor(() => '#00ffff')
            .linkDirectionalParticleSpeed(0.005)
            // Add initial camera distance
            .cameraPosition({ x: 0, y: 0, z: 600 });

        // Add zoom controls
        Graph.controls().minDistance = 200;  // Minimum zoom distance
        Graph.controls().maxDistance = 1000; // Maximum zoom distance

        // Handle window resize with debouncing
        let resizeTimeout;
        const handleResize = () => {
            if (resizeTimeout) {
                clearTimeout(resizeTimeout);
            }
            resizeTimeout = setTimeout(() => {
                Graph.width(containerRef.current.clientWidth <= 1200 ? containerRef.current.clientWidth : containerRef.current.clientWidth - 214);
                Graph.height(window.innerHeight);
            }, 150); // 150ms debounce
        };
        window.addEventListener('resize', handleResize);

        // Add hover effect
        Graph.onNodeHover(node => {
            containerRef.current.style.cursor = node ? 'pointer' : 'default';
        });

        return () => {
            window.removeEventListener('resize', handleResize);
            if (resizeTimeout) {
                clearTimeout(resizeTimeout);
            }
        };
    }, []);

    // Second useEffect to update data when Demo changes
    useEffect(() => {
        if (!graphRef.current) return;
        const newData = transformData();
        graphRef.current.graphData(newData);
    }, [Demo]);

    return (
        <div style={{
            height: '100vh', width: '100'
        }} >
            <div className="bg-[#111919] w-full h-screen" ref={containerRef}>
                <style jsx>{`
                :global(.scene-tooltip) {
                    padding: 8px;
                    background: rgba(17, 25, 25, 0.95);
                    color: #ffffff;
                    border: 1px solid #00ffff;
                    border-radius: 4px;
                    font-size: 12px;
                    box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
                }
            `}</style>
            </div>
        </div>
    );
};
