defmodule CanvasPubsubWeb.RoomChannel do
  use CanvasPubsubWeb, :channel

  def join("rooms:lobby", msg, socket) do
    Process.flag(:trap_exit, true)
    {:ok, socket}
  end

  def handle_in("move", %{"x" => x, "y" => y, "color" => color}, socket) do
    broadcast! socket, "move", %{"x" => x, "y" => y, "color" => color}
    {:noreply, socket}
  end

end
