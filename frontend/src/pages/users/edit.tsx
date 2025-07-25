import { useNavigation } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";

export const UserEdit = () => {
  const { list } = useNavigation();

  const {
    refineCore: { onFinish },
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  return (
    <div style={{ padding: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Edit</h1>
        <div>
          <button
            onClick={() => {
              list("users");
            }}
          >
            List
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit(onFinish)}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <label>
            <span style={{ marginRight: "8px" }}>Email</span>
            <input
              type="text"
              {...register("email", {
                required: "This field is required",
              })}
            />
            <span style={{ color: "red" }}>
              {(errors as any)?.email?.message as string}
            </span>
          </label>
           <label>
            <span style={{ marginRight: "8px" }}>Name</span>
            <input
              type="text"
              {...register("name", {
                required: "This field is required",
              })}
            />
            <span style={{ color: "red" }}>
              {(errors as any)?.name?.message as string}
            </span>
          </label>
           <label>
            <span style={{ marginRight: "8px" }}>User Name</span>
            <input
              type="text"
              {...register("userName", {
                required: "This field is required",
              })}
            />
            <span style={{ color: "red" }}>
              {(errors as any)?.userName?.message as string}
            </span>
          </label>
          <div>
            <input type="submit" value="Save" />
          </div>
        </div>
      </form>
    </div>
  );
};
