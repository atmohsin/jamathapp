import { useNavigation, useResource, useShow } from "@refinedev/core";

export const UserShow = () => {
  const { edit, list } = useNavigation();
  const { id } = useResource();
  const { queryResult } = useShow({});
  const { data } = queryResult;

  const record = data?.data;

  return (
    <div style={{ padding: "16px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1>Show</h1>
        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={() => list("categories")}>List</button>
          <button onClick={() => edit("categories", id ?? "")}>Edit</button>
        </div>
      </div>
      <div>
        <div style={{ marginTop: "6px" }}>
          <h5>ID</h5>
          <div>{record?.id ?? ""}</div>
        </div>
        <div style={{ marginTop: "6px" }}>
          <h5>Title</h5>
          <div>{record?.title}</div>
        </div>
      </div>
    </div>
  );
};
