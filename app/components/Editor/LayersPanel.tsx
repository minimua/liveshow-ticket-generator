'use client'

import { LayerItem } from './LayerItem'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useCallback } from 'react'; // 添加导入

export function LayersPanel({ layers = [] }: { layers: Array<any> }) { 
    const onLayerOrderChange = useCallback((result: any) => {
        // 处理拖放结束的逻辑
        console.log(result);
    }, []);

    return (
      <div className="w-64 bg-white p-4 shadow rounded">
        <h3 className="font-medium mb-4">图层</h3>
        
        <DragDropContext onDragEnd={onLayerOrderChange}>
          <Droppable droppableId="layers">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-2"
              >
                {layers.map((layer, index) => (
                  <LayerItem 
                    key={layer.id}
                    layer={layer}
                    index={index}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    )
}