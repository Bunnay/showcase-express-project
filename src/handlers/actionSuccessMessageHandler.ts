class ActionSuccessMessageHandler {
  public message: string;

  constructor(message?: string) {
    this.message = message || "Successful request";
  }

  // Create message
  static create(name?: string): string {
    return name
      ? `${name} has been created successfully!`
      : "Created successfully!";
  }

  // Update message
  static update(name?: string): string {
    return name
      ? `${name} has been updated successfully!`
      : "Updated successfully!";
  }

  // Delete message
  static delete(name?: string): string {
    return name
      ? `${name} has been deleted successfully!`
      : "Deleted successfully!";
  }

  // Assign message
  static assign(name?: string): string {
    return name
      ? `${name} has been assigned successfully!`
      : "Assigned successfully!";
  }

  // Block message
  static block(name?: string): string {
    return name
      ? `${name} has been blocked successfully!`
      : "Blocked successfully!";
  }

  // Activate message
  static activate(name?: string): string {
    return name
      ? `${name} has been activated successfully!`
      : "Activated successfully!";
  }
}

export default ActionSuccessMessageHandler;
