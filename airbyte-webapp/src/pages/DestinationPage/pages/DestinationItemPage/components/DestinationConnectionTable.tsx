import React, { useCallback } from "react";

import { ConnectionTable } from "components/EntityTable";
import useSyncActions from "components/EntityTable/hooks";
import { ITableDataItem } from "components/EntityTable/types";
import { getConnectionTableData } from "components/EntityTable/utils";

import useRouter from "hooks/useRouter";
import { RoutePaths } from "pages/routePaths";
import { useDestinationDefinitionList } from "services/connector/DestinationDefinitionService";
import { useSourceDefinitionList } from "services/connector/SourceDefinitionService";

import { WebBackendConnectionRead } from "../../../../../core/request/AirbyteClient";

type IProps = {
  connections: WebBackendConnectionRead[];
};

const DestinationConnectionTable: React.FC<IProps> = ({ connections }) => {
  const { push } = useRouter();
  const { changeStatus, syncManualConnection } = useSyncActions();

  const { sourceDefinitions } = useSourceDefinitionList();
  const { destinationDefinitions } = useDestinationDefinitionList();

  const data = getConnectionTableData(connections, sourceDefinitions, destinationDefinitions, "destination");

  const onChangeStatus = useCallback(
    async (connectionId: string) => {
      const connection = connections.find((item) => item.connectionId === connectionId);

      if (connection) {
        await changeStatus(connection);
      }
    },
    [changeStatus, connections]
  );

  const onSync = useCallback(
    async (connectionId: string) => {
      const connection = connections.find((item) => item.connectionId === connectionId);
      if (connection) {
        await syncManualConnection(connection);
      }
    },
    [connections, syncManualConnection]
  );

  const clickRow = (source: ITableDataItem) => push(`../../../${RoutePaths.Connections}/${source.connectionId}`);

  return (
    <ConnectionTable
      data={data}
      onClickRow={clickRow}
      entity="destination"
      onChangeStatus={onChangeStatus}
      onSync={onSync}
    />
  );
};

export default DestinationConnectionTable;
